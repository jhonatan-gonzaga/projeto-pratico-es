# Análise dos Resultados dos Testes da US #27 - teste  Automatizado 
<img width="1240" height="646" alt="image" src="https://github.com/user-attachments/assets/ae9ed181-49ac-48e3-9dee-d02528e86f24" />

# Relatório de Execução de Testes — US #27

<div align="justify">
Os testes executados para a US #27 – <em>Validação de acesso via celular, Gmail ou senha da persona Profissional</em> tiveram resultado satisfatório, demonstrando que as regras de validação definidas nas classes de equivalência foram implementadas corretamente no sistema.
</div>

<br>

<div align="justify">
Foram executados sete casos de teste derivados do particionamento em classes de equivalência. O <strong>Caso 1</strong> representou o cenário válido, utilizando um telefone com 11 dígitos, um endereço de Gmail válido e uma senha contendo pelo menos 8 caracteres com letras e números. Como esperado, o sistema aceitou os dados informados.
</div>

<br>

<div align="justify">
Os demais casos de teste representaram cenários inválidos. Nos <strong>Casos 2 e 3</strong>, foram utilizados números de telefone com quantidade incorreta de dígitos (menor e maior que 11), e o sistema rejeitou os dados. Nos <strong>Casos 4 e 5</strong>, foram testados formatos inválidos de Gmail, um sem o caractere “@” e outro sem domínio válido, sendo corretamente identificados pelo sistema como entradas inválidas. Já nos <strong>Casos 6 e 7</strong>, foram avaliadas regras relacionadas à senha: uma senha com menos de 8 caracteres e uma senha sem a combinação obrigatória de letras e números. Em ambos os casos, o sistema bloqueou o acesso conforme especificado nos requisitos.
</div>

<br>

<blockquote>
  <h3>Status da Execução</h3>
  <p>O relatório de execução apresentou o resultado <strong>“8 passed, 8 total”</strong>, indicando que todos os testes planejados foram executados com sucesso e produziram os resultados esperados. Dessa forma, pode-se concluir que as validações de telefone, Gmail e senha estão funcionando corretamente e atendem aos critérios de aceitação estabelecidos para a história de usuário #27.</p>
</blockquote>

<hr>

<div align="justify">
<em>A rastreabilidade entre requisitos, classes de equivalência, casos de teste e testes automatizados foi mantida, permitindo verificar que cada regra de negócio definida para a autenticação foi efetivamente validada durante a execução dos testes.</em>
</div>




# #27 - Validação de acesso via celular, Gmail ou senha da persona Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas                                                | Classes Inválidas                    | Classes Inválidas                   |
| ------------------- | -------------------------------------------------------------- | ------------------------------------ | ----------------------------------- |
| Número de celular   | Telefone com 11 dígitos (1)                                    | Telefone com menos de 11 dígitos (2) | Telefone com mais de 11 dígitos (3) |
| Gmail               | Gmail contendo @ e domínio válido (4)                          | Gmail sem @ (5)                      | Gmail sem domínio válido (6)        |
| Senha               | Senha com no mínimo 8 caracteres contendo letras e números (7) | Senha com menos de 8 caracteres (8)  | Senha sem letras ou sem números (9) |

**Legenda da Tabela:** Classes de Equivalência da US #27.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                  | Resultado Esperado |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- | ------------------ |
| Caso 1         | 1, 4, 7                 | Telefone="92999991234"; Gmail="[carlos.lima@gmail.com](mailto:carlos.lima@gmail.com)"; Senha="Carlos123"  | Válido             |
| Caso 2         | 2, 4, 7                 | Telefone="9299991234"; Gmail="[carlos.lima@gmail.com](mailto:carlos.lima@gmail.com)"; Senha="Carlos123"   | Inválido           |
| Caso 3         | 3, 4, 7                 | Telefone="929999912345"; Gmail="[carlos.lima@gmail.com](mailto:carlos.lima@gmail.com)"; Senha="Carlos123" | Inválido           |
| Caso 4         | 1, 5, 7                 | Telefone="92999991234"; Gmail="carlos.limagmail.com"; Senha="Carlos123"                                   | Inválido           |
| Caso 5         | 1, 6, 7                 | Telefone="92999991234"; Gmail="carlos.lima@"; Senha="Carlos123"                                           | Inválido           |
| Caso 6         | 1, 4, 8                 | Telefone="92999991234"; Gmail="[carlos.lima@gmail.com](mailto:carlos.lima@gmail.com)"; Senha="Car123"     | Inválido           |
| Caso 7         | 1, 4, 9                 | Telefone="92999991234"; Gmail="[carlos.lima@gmail.com](mailto:carlos.lima@gmail.com)"; Senha="12345678"   | Inválido           |

**Legenda da Tabela:** Casos de Teste da US #27.


## Simulação de Testes Manuais dos Casos de Teste da US #27.

### Caso 1  
<img width="300" alt="image" src="https://github.com/user-attachments/assets/93aa0e20-b5a1-46dd-a743-1f99a9b479bb" />

(Classes de Equivalência 1, 4, 7)   

### Caso 2 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/936c889c-4637-4a59-8c39-da0dab2897f2" />

(Classes de Equivalência 2, 4, 7)

### Caso 3 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/0510d038-ea94-44e7-bed3-fcaea52a501c" />

(Classes de Equivalência 3, 4, 7)

### Caso 4 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/d68defb7-c46f-4dd0-b9d9-19b93503d99b" />

(Classes de Equivalência 1, 5, 7)

### Caso 5 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/9eaaad8f-6fab-45fb-8094-755012b676a4" />

(Classes de Equivalência 1, 6, 7)

### Caso 6 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/d41fc861-531d-43fb-97c0-e222e4a033e4" />

(Classes de Equivalência 1, 4, 8)

### Caso 7 
<img width="300" alt="image" src="https://github.com/user-attachments/assets/ece8c3af-de89-4690-9c8d-b6167799a561" />

(Classes de Equivalência 1, 4, 9)
