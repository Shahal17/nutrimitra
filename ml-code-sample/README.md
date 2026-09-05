# ML Code Sample — Binary Classification

A small machine-learning project designed to demonstrate readable Python and a complete supervised-learning workflow without unnecessary framework boilerplate.

## What it demonstrates

- loading and inspecting a standard dataset
- reproducible train/test splitting
- feature scaling without data leakage using a scikit-learn Pipeline
- logistic regression classification
- evaluation with accuracy, confusion matrix, precision, recall, and F1-score
- simple function-based Python structure

## Dataset

The project uses scikit-learn's built-in Breast Cancer Wisconsin diagnostic dataset. Because the dataset ships with scikit-learn, no external download or API key is required.

## Run locally

```bash
python -m venv .venv
```

Activate the environment, then install dependencies:

```bash
pip install -r requirements.txt
python train.py
```

## Why Logistic Regression?

For a code sample, I wanted a model that is easy to understand and inspect rather than hiding the workflow behind a complex architecture. Logistic regression provides a strong baseline for binary classification, while the Pipeline demonstrates an important ML practice: fitting preprocessing only on training data.

## Project structure

```text
ml-code-sample/
├── train.py
├── requirements.txt
└── README.md
```

## Possible next steps

- compare logistic regression with decision trees or random forests
- add cross-validation and hyperparameter tuning
- visualize the confusion matrix and feature distributions
- add automated tests

## Note

This is intentionally a compact code sample. The goal is to make the ML reasoning and implementation easy to review and discuss.
