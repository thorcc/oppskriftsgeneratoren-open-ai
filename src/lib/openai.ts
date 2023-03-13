// import * as dotenv from 'dotenv'
// dotenv.config()

const API_KEY = import.meta.env.API_KEY

export const chatCompletion = async (prompt: String) => {
    const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY,
            },
            "body": JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ "role": "user", "content": prompt }]
            })
        }
    )
    const data = await response.json()
    return data
}

export const imageGeneration = async (prompt: String) => {
    const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY,
            },
            "body": JSON.stringify({
                "prompt": prompt,
                "n": 1,
                "size": "512x512",
                "response_format": "url" 
            })
        }
    )
    const data = await response.json()
    return data
}