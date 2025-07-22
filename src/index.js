const Mario = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0,
};
const Luigi = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0,
};
const Peach = {
  nome: "Peach",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 2,
  pontos: 0,
};
const Yoshi = {
  nome: "Yoshi",
  velocidade: 2,
  manobrabilidade: 4,
  poder: 3,
  pontos: 0,
};
const Bowser = {
  nome: "Bowser",
  velocidade: 5,
  manobrabilidade: 2,
  poder: 5,
  pontos: 0,
};
const DK = {
  nome: "DK",
  velocidade: 2,
  manobrabilidade: 2,
  poder: 5,
  pontos: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let randomBlock = Math.random();
  let result;

  switch (true) {
    case randomBlock < 0.33:
      result = "reta";
      break;
    case randomBlock < 0.66:
      result = "curva";
      break;
    default:
      result = "confronto";
      break;
  }
  return result;
}

async function logRollDice(character, diceResult, atribute) {
  const result = diceResult + atribute;
  console.log(`${character} 🎲 rolou ${diceResult} + ${atribute} = ${result}`);
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round} `);

    //blocks
    let block = await getRandomBlock();
    console.log(`🏁 A pista é ${block}`);

    //roll dice
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //test skill
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "reta") {
      totalTestSkill1 = character1.velocidade + diceResult1;
      totalTestSkill2 = character2.velocidade + diceResult2;

      await logRollDice(character1.nome, diceResult1, character1.velocidade);
      await logRollDice(character2.nome, diceResult2, character2.velocidade);
    }
    if (block === "curva") {
      totalTestSkill1 = character1.manobrabilidade + diceResult1;
      totalTestSkill2 = character2.manobrabilidade + diceResult2;

      await logRollDice(
        character1.nome,
        diceResult1,
        character1.manobrabilidade
      );
      await logRollDice(
        character2.nome,
        diceResult2,
        character2.manobrabilidade
      );
    }
    if (block === "confronto") {
      let powerResult1 = character1.poder + diceResult1;
      let powerResult2 = character2.poder + diceResult2;

      console.log(`${character1.nome} confrontou ${character2.nome}! 🥊`);

      await logRollDice(character1.nome, diceResult1, character1.poder);
      await logRollDice(character2.nome, diceResult2, character2.poder);

      character1.pontos -=
        powerResult1 < powerResult2 && character1.pontos > 0 ? 1 : 0;
      character2.pontos -=
        powerResult2 < powerResult1 && character2.pontos > 0 ? 1 : 0;

      console.log(
        powerResult1 === powerResult2 ? "empate ninguem perdeu ponto" : ""
      );
    }

    //winner verification
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.nome} venceu a rodada! e ganhou 1 ponto!`);
      character1.pontos++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.nome} venceu a rodada! e ganhou 1 ponto!`);
      character2.pontos++;
    }
    console.log(
      "-------------------------------------------------------------------------------------"
    );
  }
}

(async function main() {
  console.log(`🏁🚨 entre ${Mario.nome} e ${Luigi.nome} começando`);
  await playRaceEngine(Mario, Luigi);
})();
