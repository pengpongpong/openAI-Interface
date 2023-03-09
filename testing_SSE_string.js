// const someVal = `"data: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"role\":\"assistant\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\"Yes\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\",\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" this\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" is\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" a\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\" test\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{\"content\":\".\"},\"index\":0,\"finish_reason\":null}]}\n\ndata: {\"id\":\"chatcmpl-6ppOTRnHBEGca3rVIEtwN6zJFB5RQ\",\"object\":\"chat.completion.chunk\",\"created\":1677810305,\"model\":\"gpt-3.5-turbo-0301\",\"choices\":[{\"delta\":{},\"index\":0,\"finish_reason\":\"stop\"}]}\n\ndata: [DONE]\n\n"`;

// const regData = /(?<=data: ).*(?=\n\n)/gi;

// let test = someVal.match(regData);

// for (chunk of test) {
//   if (chunk !== "[DONE]") {
//     chunk = JSON.parse(chunk);
//     if (chunk.choices[0].delta.content !== undefined) {
//       console.log(chunk.choices[0].delta.content);
//     }
//   } else {
//     console.log("done");
//   }
// }

// console.log(test)

const testVal = 
`
data: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \"\\n\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \"\\n\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \"This\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" is\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" a\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" test\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" of\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" a\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" sentence\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \".\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" It\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" is\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" used\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" to\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" demonstrate\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" the\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" use\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" of\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" a\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" test\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \" sentence\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: {\"id\": \"cmpl-6qWDagenwVsXbvk9aJNCE1pfk8wyo\", \"object\": \"text_completion\", \"created\": 1677974922, \"choices\": [{\"text\": \".\", \"index\": 0, \"logprobs\": null, \"finish_reason\": null}], \"model\": \"text-davinci-003\"}\n\ndata: [DONE]\n\n
`

const regData = /(?<=data: ).*(?=\n\n)/gi;

let test = testVal.match(regData);
console.log(test)
for (chunk of test) {
  if (chunk !== "[DONE]") {
    chunk = JSON.parse(chunk);
    
    if (chunk.choices[0].text !== undefined) {
      // console.log(chunk.choices[0].text);
    }
  } else {
    console.log("done");
  }
}
// console.log(test);


const obj = `{"id": "cmpl-6qWj6aDMnNI2ax3dguHRYqmLyQM6p", "object": "text_completion", "created": 1677976876, "choices": [{"text": "This", "index": 0, "logprobs": null, "finish_reason": null}], "model": "text-davinci-003"}`

let ab = JSON.parse(obj)
console.log(typeof(ab))
