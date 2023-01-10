export const PopUp = ({title}) => {
  return(
    <div className="absolute flex h-auto w-[400px] left-[1000px] top-20 px-3 py-5 z-40 bg-white rounded shadow-md shadow-stone-200]" >
      <p className="before:content-['✔️'] before:w-5 before:h-5 before:bg-green-400 before:rounded-full before:p-0.5 before:mr-5 flex items-center" >
        {title} added to your cart</p>
    </div>
  )
}