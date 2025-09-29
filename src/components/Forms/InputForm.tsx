import InputMask from "react-input-mask";

interface props {
    id: string
    label_input: string
    type_input?: string
    //cpf input
    mask?: string
    formData: any
    formErrors?: any
    handleInputChange: any
}

export default ((prop: props) => {
    return (
        <div>
            <label
                htmlFor={prop.id}
                className="block text-sm font-medium text-[#11833b] mb-1"
            >
                {prop.label_input}
            </label>

            {prop.mask ? (
                <InputMask
                    id={prop.id}
                    mask={prop.mask}
                    value={prop.formData}
                    onChange={prop.handleInputChange}
                    className={`w-full p-2 border ${prop.formErrors ? "border-red-500" : "border-gray-300"
                        } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                    required
                />
            ) : (
                <input
                    id={prop.id}
                    type={prop.type_input}
                    value={prop.formData}
                    onChange={prop.handleInputChange}
                    className={`w-full p-2 border ${prop.formErrors ? "border-red-500" : "border-gray-300"
                        } rounded focus:ring-2 focus:ring-[#11833b] focus:border-transparent`}
                    required
                />
            )}

            {prop.formErrors && (
                <p className="text-red-500 text-xs mt-1">{prop.formErrors}</p>
            )}
        </div>
    )
})