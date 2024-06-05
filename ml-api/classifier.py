import os
import ast
import urllib.request

import tflite_runtime.interpreter as tflite
from PIL import Image, ImageFilter, ImageOps
import numpy as np

class Classifier():
  def __init__(self):
    self.labels = None
    self.model = None
    self.input_details = None
    self.output_details = None

    self.init_labels()
    self.init_model()

  def init_labels(self):
    with open("./labels.txt", "r", encoding="utf8") as f:
      raw = f.read()
      self.labels = []
      for letter in raw:
        self.labels.append(letter)

  def init_model(self):
    self.model = tflite.Interpreter(model_path="./model.tflite")
    self.input_details = self.model.get_input_details()
    self.output_details = self.model.get_output_details()
    self.model.resize_tensor_input(0, [1, 64, 64, 1])
    self.model.allocate_tensors()


  def classify(self, image, cnt_predictions):
    self.model.set_tensor(self.input_details[0]["index"], image)
    self.model.invoke()
    output_data = self.model.get_tensor(self.output_details[0]["index"])
    out_np = np.array(output_data)

    preds = []
    for i in range(cnt_predictions):
      pred = self.labels[out_np.argmax()]
      preds.append(pred[0])

      out_np[out_np.max() == out_np] = 0.0

    return preds

def process_img(data_uri_img):
  img_base_64 = urllib.request.urlopen(data_uri_img)
  image = Image.open(img_base_64.file)

  if(image.getbbox()):
    image = ImageOps.invert(image)
    image = image.filter(ImageFilter.BLUR)
    image = image.resize(size=(64, 64), resample=Image.LANCZOS, reducing_gap=2.0)
    image = np.array(image).astype("float32")
    image = image[..., -1]
    image[image > 50] = 255
    image = image / image.max()
    image = image.reshape(1, 64, 64, 1)

    return image


