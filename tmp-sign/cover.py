import cv2
import numpy as np

def cover(src, dst, y0f, y1f, x0f, x1f):
    img = cv2.imread(src)
    h, w = img.shape[:2]
    y0, y1 = int(h * y0f), int(h * y1f)
    x0, x1 = int(w * x0f), int(w * x1f)
    roi = img[y0:y1, x0:x1]
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    bg = cv2.GaussianBlur(gray, (0, 0), 9)
    diff = gray.astype(np.int16) - bg.astype(np.int16)
    mask = (diff > 16).astype(np.uint8) * 255
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    hue = hsv[:, :, 0]
    sat = hsv[:, :, 1]
    val = hsv[:, :, 2]
    led = ((hue < 35) | (hue > 160)) & (sat > 90) & (val > 150)
    mask[led] = 0
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, k)
    mask = cv2.dilate(
        mask,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 3)),
        iterations=1,
    )
    full = np.zeros((h, w), np.uint8)
    full[y0:y1, x0:x1] = mask
    out = cv2.inpaint(img, full, 4, cv2.INPAINT_TELEA)
    cv2.imwrite(dst, out, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
    cv2.imwrite(dst.replace(".jpg", "-mask.jpg"), full)
    print(dst, "mask px", int((full > 0).sum()))


base = r"C:\Users\rohan\.cursor\projects\c-Projects-Real-Estate\assets"
out = r"c:\Projects\Real-Estate\tmp-sign"
cover(
    base + r"\image-27bd48fb-7912-4ca4-8e92-8b0afbdcac8a.jpg",
    out + r"\desk.jpg",
    0.718,
    0.772,
    0.52,
    0.98,
)
cover(
    base + r"\image-b0f99405-d558-496b-82c6-6f239a48d533.jpg",
    out + r"\phone.jpg",
    0.742,
    0.792,
    0.18,
    0.90,
)
