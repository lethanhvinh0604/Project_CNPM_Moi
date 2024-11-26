import client from '../connAzureOpenAI.js'
import catchAsync from '../utils/catchAsync.js'

const generateText = catchAsync(async (req, res) => {
  const { input } = req.query
  const result = await client.chat.completions.create({
    messages: input,
    model: ''
  })

  res.send(result.choices[0].message.content)
})

export default { generateText }
