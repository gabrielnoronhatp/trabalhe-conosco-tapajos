
interface props {
    srcDownload: string
    label_link:string
}
export default (({srcDownload, label_link}:props) =>{
    return(
        <>
        <a className="text-blue-700 underline font-bold" href={srcDownload} download> {label_link}</a>
        </>        
    )
})