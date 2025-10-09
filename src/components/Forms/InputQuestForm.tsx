interface props  {
    id:string
    name:string
    label_input: string
    handleGetQ:any

    value?:string
}

export default ((prop:props) =>{
    return (
        <div className="flex">
            <input type="radio" name={prop.name} id={prop.id} onChange={prop.handleGetQ} value={prop.value}/>
            <label htmlFor={prop.id} className="block text-sm font-medium ml-1">
                {prop.label_input}
            </label>
        </div>
    )
})