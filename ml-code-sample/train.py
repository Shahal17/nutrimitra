"""Simple, readable ML classification example.

This script trains a logistic regression classifier on the built-in
Breast Cancer Wisconsin dataset from scikit-learn, evaluates it, and
prints the most useful metrics.
"""

from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


def load_data():
    data = load_breast_cancer()
    return data.data, data.target, data.target_names


def build_model():
    return Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            ("classifier", LogisticRegression(max_iter=1000, random_state=42)),
        ]
    )


def main():
    X, y, target_names = load_data()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    model = build_model()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    print(f"Accuracy: {accuracy_score(y_test, predictions):.3f}")
    print("\nConfusion matrix:")
    print(confusion_matrix(y_test, predictions))
    print("\nClassification report:")
    print(classification_report(y_test, predictions, target_names=target_names))


if __name__ == "__main__":
    main()
