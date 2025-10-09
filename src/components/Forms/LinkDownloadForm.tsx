import file from '../../assets/SELEÇÃO_INTERNA.pdf'

interface props {
    srcDownload: string
    label_link:string
}

export default (({label_link}:props) =>{
    return(
        <>
        <a className="text-blue-700 underline font-bold" href={file} download > {label_link}</a>
        </>        
    )
})