import { FileText } from "lucide-react"

interface props {
    handleFileChange:any
    formErrors:any
    id:any
    label_input:any
    formData:any
}

export default (( prop:props) =>{
    return (
         <div className="mt-2">
              <label
                htmlFor={prop.id}
                className="block text-sm font-medium text-[#11833b] mb-1"
              >
                {prop.label_input} <FileText className="inline-block w-4 h-4" />
              </label>
              <input
                id={prop.id}
                type="file"
                accept=".pdf,.doc,.docx, video/"
                onChange={prop.handleFileChange}
                className={`w-full p-2 border ${prop.formErrors ? "border-red-500" : "border-gray-300"
                  } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                required
              />
              {prop.formErrors && (
                <p className="text-red-500 text-xs mt-1">{prop.formErrors}</p>
              )}
              {prop.formData && (
                <p className="text-green-600 text-xs mt-1">
                  Arquivo selecionado: {prop.formData.name}
                </p>
              )}
        </div>
    )
})