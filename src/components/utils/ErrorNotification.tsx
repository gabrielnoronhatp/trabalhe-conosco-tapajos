interface props {
    message: string
}

export default (({ message }: props) => {
    return (
        <div className="flex items-start p-1">
            <div className="flex-shrink-0 text-red-500 text-2xl">⚠️</div>
            <div className="ml-3 font-medium">
                <p className="text-base text-red-700 font-bold">Erro na Candidatura</p>
                <p className="text-sm text-red-600 mt-1">{message}</p>
            </div>
        </div>
    )
})