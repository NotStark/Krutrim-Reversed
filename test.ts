import Krutrim from "./src/index";

const auth = ""

const kru = new Krutrim(auth)

; (async () => {
    console.log((await kru.chatCompletion("Hi")));
})()
