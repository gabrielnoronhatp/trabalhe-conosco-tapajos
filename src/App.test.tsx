import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeAll(() => {
  window.alert = jest.fn();
});

test('preenche todos os campos do formulário', () => {
  render(<App />);

  // Preencher o campo de nome completo
  const fullNameInput = screen.getByLabelText(/Nome Completo/i);
  fireEvent.change(fullNameInput, { target: { value: 'João da Silva' } });

  // Preencher o campo de cargo desejado
  const positionSelect = screen.getByLabelText(/Cargo Desejado/i);
  fireEvent.change(positionSelect, { target: { value: 'desenvolvedor' } });

  // Preencher o campo de endereço
  const addressInput = screen.getByLabelText(/Endereço Completo/i);
  fireEvent.change(addressInput, { target: { value: 'Rua Exemplo, 123' } });

  // Preencher o campo de disponibilidade
  const availabilitySelect = screen.getByLabelText(/Disponibilidade/i);
  fireEvent.change(availabilitySelect, { target: { value: 'total' } });

  // Preencher o campo de CPF
  const cpfInput = screen.getByLabelText(/CPF/i);
  fireEvent.change(cpfInput, { target: { value: '123.456.789-00' } });

  // Preencher o campo de RG
  const rgInput = screen.getByLabelText(/RG/i);
  fireEvent.change(rgInput, { target: { value: 'MG-12.345.678' } });

  // Preencher o campo de e-mail
  const emailInput = screen.getByLabelText(/E-mail/i);
  fireEvent.change(emailInput, { target: { value: 'joao@example.com' } });

  // Preencher o campo de telefone
  const phoneInput = screen.getByLabelText(/Telefone/i);
  fireEvent.change(phoneInput, { target: { value: '(31) 98765-4321' } });

  // Preencher o campo de experiência profissional
  const experienceTextarea = screen.getByLabelText(/Experiência Profissional/i);
  fireEvent.change(experienceTextarea, { target: { value: '5 anos de experiência em desenvolvimento web.' } });

  // Preencher o campo de formação acadêmica
  const educationTextarea = screen.getByLabelText(/Formação Acadêmica/i);
  fireEvent.change(educationTextarea, { target: { value: 'Bacharel em Ciência da Computação' } });

  // Preencher o campo de habilidades e competências
  const skillsTextarea = screen.getByLabelText(/Habilidades e Competências/i);
  fireEvent.change(skillsTextarea, { target: { value: 'JavaScript, React, Node.js' } });

  // Simular o envio do formulário
  const submitButton = screen.getByRole('button', { name: /Enviar Candidatura/i });
  fireEvent.click(submitButton);

  // Verificar se o alerta de sucesso foi exibido
  expect(window.alert).toHaveBeenCalledWith('Dados enviados com sucesso!');
}); 