import './category.scss';
const Category = ({data}) => {

  const renderContent = data.map((d) => {
    return (
      <div className={`${d.name} category`}>
        <img src={d.path} alt={d.name} className="" />
        <p>{d.title}</p>
      </div>
    )
  })

  return(
    <div className='categories'>
      {renderContent}
    </div>
  )
}

export default Category