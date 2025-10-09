interface Candidate {
    fullName: string,
    position: string,
    jobId: string,
    photo: File | null,
    address: string,

    //Novas Alterações
    cargo_atual: string,
    data_admissao: string,
    loja_setor: string,
    termo: boolean,
    form_file: File | null,
    name_reference: string,
    loja_setor_reference: string,
    video_apresentation: File | null,
    matricula: string,

    availability: string,
    experience: string,
    cpf: string,
    rg: string,
    checkbox: boolean,
    education: string,
    skills: string,
    email: string,
    phone: string,
    cv: File | null,
    cep: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: string,
    complemento: string,
}

export const service = {
    handleSubmit: async (data: Candidate) => {
        const formDataToSend = new FormData()

        const cleanedCpf = data.cpf.replace(/[.-]/g, "");
        formDataToSend.append("cpf", cleanedCpf);
        formDataToSend.append("vaga_id", data.jobId);
        formDataToSend.append("nome_completo", data.fullName);
        formDataToSend.append("email", data.email);
        formDataToSend.append("cep", data.cep);
        formDataToSend.append("bairro", data.bairro);
        formDataToSend.append("cidade", data.cidade);
        formDataToSend.append("estado", data.estado);
        formDataToSend.append("address", data.address);
        formDataToSend.append("numero", data.numero);
        formDataToSend.append("complemento", data.complemento);
        formDataToSend.append("telefone", data.phone);
        formDataToSend.append("is_primeiraexperiencia", String(data.checkbox));
        formDataToSend.append("is_disponivel", data.availability);
        formDataToSend.append("cargo_atual", data.cargo_atual);
        formDataToSend.append("data_admissao", data.data_admissao);
        formDataToSend.append("loja_setor", data.loja_setor);
        formDataToSend.append("name_reference", data.name_reference);
        formDataToSend.append("loja_setor_reference", data.loja_setor_reference);
        formDataToSend.append("matricula", data.matricula);
        formDataToSend.append("termo", String(data.termo));

        if (data.form_file) formDataToSend.append("file_form", data.form_file);
        if (data.photo) formDataToSend.append("foto_perfil", data.photo);
        if (data.cv) formDataToSend.append("file", data.cv);

        const response = await fetch("https://api.rh.grupotapajos.com.br/candidatos", {
            method: "POST",
            body: formDataToSend,
        });

        const text = await response.text();
        let responseData: any;

        try {
            responseData = JSON.parse(text);
        } catch {
            responseData = { message: text };
        }

        if (!response.ok) {
            const errorMessage =
                responseData.error ||
                responseData.message ||
                `Erro ${response.status}: Falha ao enviar candidatura`;
            throw new Error(errorMessage);
        }

        return responseData;

    }
}
