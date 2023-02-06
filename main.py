from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.llms import OpenAI
from flask import Flask, request, jsonify
from langchain.utilities import SerpAPIWrapper

params = {
  "engine": "google_scholar",
  "gl": "us",
  "hl": "en",
}
search = SerpAPIWrapper(params=params)

app = Flask(__name__)

llm = OpenAI(temperature=0, model_name='text-davinci-003')
tools = load_tools(["serpapi"], llm=llm)
agent = initialize_agent(tools,
                         llm,
                         agent="zero-shot-react-description",
                         verbose=True)


def generate_response(assertion):

  response = agent.run(
    "Find all assertions in this paragraph and quote an excerpt from an article from PubMed to support each assertion, once found state the authors, titles and source (Ask yourself if the found articles excerpt actually supports the assertion, if you can't find it after a few searches, then there is none found): "
    + assertion)

  return response


@app.route('/', methods=['GET', 'POST'])
def handle_request():
  if request.method == 'POST':
    assertion = request.json.get('assertion')
    response = generate_response(assertion)
    return jsonify({'response': response})
  elif request.method == 'GET':
    return jsonify({'response': "Hello"})


app.run(host='0.0.0.0', port=81)
