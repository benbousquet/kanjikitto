from flask import Flask, request, jsonify
import classifier

app = Flask(__name__)

predictor = classifier.Classifier()

@app.route("/classify", methods=["POST"])
def classify():
  req = request.get_json()

  imgDataURL = req['imgDataURL']

  processedImg = classifier.process_img(imgDataURL)

  prediction = predictor.classify(processedImg, 5)

  return jsonify({"predictions": prediction})





  