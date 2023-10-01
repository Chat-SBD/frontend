import tensorflow as tf
import keras
import numpy
import importlib

integer = importlib.import_module("numpy").integer

import tensorflowjs as tfjs

#this is the code that's supposed to do the conversion but its throwing a weird
#error on my computer
model = tf.saved_model.load("model.h5")

tfjs.converters.save_keras_model(model)