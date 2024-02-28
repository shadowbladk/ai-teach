import axios from "axios";

export async function getCompletion(prompt: string): Promise<string> {
  const completion = await axios.post(
    "https://abyss.se.kmitl.ac.th/llama2/v1/completions",
    {
      prompt: "\n\n### Instructions:\n" + prompt + "\n\n### Response:\n",
      stop: ["\n", "###"],
    }
  );
  return completion.data.choices[0].text;
}
