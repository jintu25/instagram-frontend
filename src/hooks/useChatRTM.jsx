import { setMessages } from "@/redux/chatSlice"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useChatRTM = () => {
    const dispatch = useDispatch()
    const { messages } = useSelector(store => store.chat)
    const { socket } = useSelector(store => store.socketio)
    useEffect(() => {
        socket?.on("newMessages", (newMessages) => {
            dispatch(setMessages([...messages, newMessages]))
        })
        return () => {
            socket?.off("newMessages")
        }
    }, [messages, setMessages])
}

export default useChatRTM