// ======================================
// DADOS DOS CARDS
// ======================================

const cardsData = {

    "Geral": [
        "Proatividade e Engajamento",
        "Trabalho em Equipe",
        "Organização e Gestão do Tempo",
        "Comunicação"
    ],

    "JFIN": [
        "Google Sheets",
        "Google Docs",
        "Conhecimento Financeiro",
        "Prudência"
    ],

    "Projetos": [
        "Melhoria de Processos",
        "Pensamento Crítico",
        "Capacidade Analítica"
    ],

    "P&I": [
        "Notion",
        "Google Sheets/Excel",
        "Pesquisa Estruturada"
    ],

    "Comercial": [
        "Oratória",
        "Escuta Ativa",
        "Técnicas de Venda",
        "Domínio do Portfólio",
        "Diagnóstico"
    ],

    "Marketing": [
        "Criatividade",
        "Senso Estético",
        "Atualização de Tendências",
        "Análise de Métricas",
        "Capacidade de Adaptação"
    ],

    "Liga": [
        "Ética",
        "Empatia",
        "Consciência Social",
        "Flexibilidade"
    ],

    "GP": [
        "Criatividade",
        "Empatia",
        "Inteligência Emocional",
        "Pensamento Crítico"
    ]
};



// ======================================
// SELEÇÃO PADRÃO
// ======================================

const defaultSelection = [
    "Geral",
    "GP",
    "JFIN"
];



// ======================================
// NÍVEIS
// ======================================

const levelOptions = [

    {
        value: 1,
        label: "Nível 1"
    },

    {
        value: 2,
        label: "Nível 2"
    },

    {
        value: 3,
        label: "Nível 3"
    }

];



const levelClassMap = {

    1: "level-1",
    2: "level-2",
    3: "level-3"

};



const levelLabelMap = {

    1: "Nível 1",
    2: "Nível 2",
    3: "Nível 3"

};



// ======================================
// ESTADO DO SISTEMA
// ======================================

let selectedCards = [
    ...defaultSelection
];


let levelsState = {};



// ======================================
// ELEMENTOS DO HTML
// ======================================

const card1 =
    document.getElementById("card1");


const card2 =
    document.getElementById("card2");


const card3 =
    document.getElementById("card3");


const selectionMessage =
    document.getElementById(
        "selectionMessage"
    );


const competencyEditors =
    document.getElementById(
        "competencyEditors"
    );


const matrixCards =
    document.getElementById(
        "matrixCards"
    );


const renderBtn =
    document.getElementById(
        "renderBtn"
    );


const downloadBtn =
    document.getElementById(
        "downloadBtn"
    );


const resetBtn =
    document.getElementById(
        "resetBtn"
    );



// ======================================
// INICIALIZAÇÃO
// ======================================

function init() {

    // Seleção inicial

    card1.value = "Geral";

    card2.value = "GP";

    card3.value = "JFIN";


    selectedCards = [

        card1.value,
        card2.value,
        card3.value

    ];


    initializeLevels();

    createEditors();

    renderMatrix();


    // Eventos dos cards

    card1.addEventListener(
        "change",
        onCardSelectionChange
    );


    card2.addEventListener(
        "change",
        onCardSelectionChange
    );


    card3.addEventListener(
        "change",
        onCardSelectionChange
    );


    // Atualizar

    renderBtn.addEventListener(
        "click",
        function () {

            if (validateSelections()) {

                createEditors();

                renderMatrix();

            }

        }
    );


    // Baixar

    downloadBtn.addEventListener(
        "click",
        downloadImage
    );


    // Resetar

    resetBtn.addEventListener(
        "click",
        resetEverything
    );

}



// ======================================
// CRIAR ESTADO DOS NÍVEIS
// ======================================

function initializeLevels() {

    levelsState = {};


    Object.keys(cardsData).forEach(

        function (cardName) {

            levelsState[cardName] = {};


            cardsData[cardName].forEach(

                function (competency) {

                    levelsState[
                        cardName
                    ][
                        competency
                    ] = 1;

                }

            );

        }

    );

}



// ======================================
// TROCA DOS CARDS
// ======================================

function onCardSelectionChange() {

    selectedCards = [

        card1.value,
        card2.value,
        card3.value

    ];


    if (validateSelections()) {

        createEditors();

        renderMatrix();

    }

}



// ======================================
// VALIDAR SELEÇÃO
// ======================================

function validateSelections() {

    const values = [

        card1.value,
        card2.value,
        card3.value

    ];


    const uniqueValues =
        new Set(values);


    // Os cards precisam ser diferentes

    if (uniqueValues.size !== 3) {

        selectionMessage.textContent =
            "Escolha 3 cards diferentes.";

        return false;

    }


    selectionMessage.textContent = "";


    selectedCards = values;


    return true;

}



// ======================================
// CRIAR CONTROLES DE NÍVEL
// ======================================

function createEditors() {

    competencyEditors.innerHTML = "";


    selectedCards.forEach(

        function (cardName) {

            const editorCard =
                document.createElement(
                    "div"
                );


            editorCard.className =
                "editor-card";


            // Título

            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                cardName;


            editorCard.appendChild(
                title
            );


            // Competências

            cardsData[
                cardName
            ].forEach(

                function (competency) {

                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "editor-row";


                    const label =
                        document.createElement(
                            "label"
                        );


                    label.textContent =
                        competency;


                    const select =
                        document.createElement(
                            "select"
                        );


                    select.dataset.card =
                        cardName;


                    select.dataset.competency =
                        competency;


                    levelOptions.forEach(

                        function (level) {

                            const option =
                                document.createElement(
                                    "option"
                                );


                            option.value =
                                level.value;


                            option.textContent =
                                level.label;


                            if (

                                Number(
                                    levelsState[
                                        cardName
                                    ][
                                        competency
                                    ]
                                )

                                ===

                                level.value

                            ) {

                                option.selected =
                                    true;

                            }


                            select.appendChild(
                                option
                            );

                        }

                    );


                    // Alteração do nível

                    select.addEventListener(

                        "change",

                        function (event) {

                            const selectedCard =
                                event.target
                                    .dataset.card;


                            const selectedCompetency =
                                event.target
                                    .dataset.competency;


                            const selectedLevel =
                                Number(
                                    event.target.value
                                );


                            levelsState[
                                selectedCard
                            ][
                                selectedCompetency
                            ] =
                                selectedLevel;


                            renderMatrix();

                        }

                    );


                    row.appendChild(
                        label
                    );


                    row.appendChild(
                        select
                    );


                    editorCard.appendChild(
                        row
                    );

                }

            );


            competencyEditors.appendChild(
                editorCard
            );

        }

    );

}



// ======================================
// RENDERIZAR MATRIZ
// ======================================

function renderMatrix() {

    if (!validateSelections()) {

        return;

    }


    matrixCards.innerHTML = "";


    selectedCards.forEach(

        function (cardName) {

            const cardElement =
                document.createElement(
                    "div"
                );


            cardElement.className =
                "matrix-card";


            // Título

            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                cardName;


            cardElement.appendChild(
                title
            );


            // Competências

            cardsData[
                cardName
            ].forEach(

                function (competency) {

                    const level =
                        levelsState[
                            cardName
                        ][
                            competency
                        ];


                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "competency-item";


                    // Nome da competência

                    const competencyName =
                        document.createElement(
                            "div"
                        );


                    competencyName.className =
                        "competency-name";


                    competencyName.textContent =
                        competency;


                    // Barra

                    const bar =
                        document.createElement(
                            "div"
                        );


                    bar.className =
                        "level-bar";


                    // Preenchimento

                    const fill =
                        document.createElement(
                            "div"
                        );


                    fill.className =
                        `level-fill ${levelClassMap[level]}`;


                    fill.textContent =
                        levelLabelMap[level];


                    bar.appendChild(
                        fill
                    );


                    item.appendChild(
                        competencyName
                    );


                    item.appendChild(
                        bar
                    );


                    cardElement.appendChild(
                        item
                    );

                }

            );


            matrixCards.appendChild(
                cardElement
            );

        }

    );

}



// ======================================
// RESETAR TUDO
// ======================================

function resetEverything() {

    // Volta os cards para o padrão

    card1.value = "Geral";

    card2.value = "GP";

    card3.value = "JFIN";


    selectedCards = [

        "Geral",
        "GP",
        "JFIN"

    ];


    // Volta todas as competências
    // para o nível 1

    initializeLevels();


    // Limpa mensagens

    selectionMessage.textContent = "";


    // Atualiza controles

    createEditors();


    // Atualiza matriz

    renderMatrix();

}



// ======================================
// BAIXAR MATRIZ COMO PNG
// ======================================

function downloadImage() {

    if (!validateSelections()) {

        return;

    }


    const exportArea =
        document.getElementById(
            "exportArea"
        );


    html2canvas(

        exportArea,

        {

            scale: 2,

            useCORS: true,

            backgroundColor: null

        }

    )

    .then(

        function (canvas) {

            const image =
                canvas.toDataURL(
                    "image/png"
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                image;


            link.download =
                "matriz-de-competencias.png";


            link.click();

        }

    );

}



// ======================================
// INICIAR SITE
// ======================================

init();