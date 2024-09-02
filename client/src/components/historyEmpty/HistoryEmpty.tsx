interface HistoryEmptyProps{
  size:number
}

 const HistoryEmpty:React.FC<HistoryEmptyProps> = ({size}) => {

   
  return (
    <p  style={{ height: `${size}px` }} className={` px-1 flex items-center justify-center rounded-xl w-full border-dotted border-[2px] my-2 ] `}>
            
    Your conversation history is empty
  </p>
  )
}
export default HistoryEmpty;