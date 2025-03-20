from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import torch.nn.functional as F

# Load FinBERT Model and Tokenizer
model_name = "ProsusAI/finbert"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def get_sentiment_score(text, chunk_size=400, stride=200):
    """
    Analyzes sentiment of long text using a sliding window approach.
    
    Args:
        text (str): Client's speech or transcript.
        chunk_size (int): Number of tokens per chunk (Max 512).
        stride (int): Overlapping tokens between chunks.

    Returns:
        dict: Sentiment label with average score across chunks.
    """
    # Tokenize text into tokens
    tokens = tokenizer.encode(text, add_special_tokens=True)
    
    # If within token limit, process normally
    if len(tokens) <= 512:
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = model(**inputs)
        probs = F.softmax(outputs.logits, dim=-1)
        sentiment_score, sentiment_label = torch.max(probs, dim=1)
        return {"sentiment": ["negative", "neutral", "positive"][sentiment_label.item()], "score": sentiment_score.item()}

    # Process long text in overlapping chunks
    sentiments = []
    scores = []

    for i in range(0, len(tokens), stride):
        chunk = tokens[i:i + chunk_size]
        if len(chunk) < 10:  # Ignore very small fragments
            break
        inputs = tokenizer.decode(chunk, skip_special_tokens=True)
        result = get_sentiment_score(inputs)  # Recursively analyze chunk
        sentiments.append(result["sentiment"])
        scores.append(result["score"])

    # Aggregate results (majority vote or average score)
    final_sentiment = max(set(sentiments), key=sentiments.count)  # Majority vote
    avg_score = sum(scores) / len(scores)

    return {"sentiment": final_sentiment, "score": avg_score}

# Example Usage
client_text = "Your full transcript here..."  # Ensure it's a long text
result = get_sentiment_score(client_text)
print(result)