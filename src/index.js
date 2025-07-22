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

async function getRandomWeapon() {
  let RandomWeapon = Math.random();
  let result;

  if (RandomWeapon < 0.5) {
    result = "casco";
  }
  if (RandomWeapon > 0.5) {
    result = "bomba";
  }
  return result;
}
async function getRandomTurbo() {
  let RandomTurbo = Math.random();
  let result;

  if (RandomTurbo < 0.5) {
    result = true;
  }
  if (RandomTurbo > 0.5) {
    result = false;
  }
  return result;
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

async function Winenr(character1, character2) {
  if (character1.pontos > character2.pontos) {
    console.log(`${character1.nome} venceu a corrida! 🏆`);
  } else if (character2.pontos > character1.pontos) {
    console.log(`${character2.nome} venceu a corrida! 🏆`);
  } else {
    console.log("A corrida terminou em empate! 🤝");
  }
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
      let weapon = await getRandomWeapon();

      let powerResult1 = character1.poder + diceResult1;
      let powerResult2 = character2.poder + diceResult2;

      let losePoint = weapon === "casco" ? 1 : 2;

      let turbo = await getRandomTurbo();

      console.log(`${character1.nome} confrontou ${character2.nome}! 🥊`);

      await logRollDice(character1.nome, diceResult1, character1.poder);
      await logRollDice(character2.nome, diceResult2, character2.poder);

      if (powerResult1 < powerResult2) {
        if (character1.pontos > 0) {
          console.log(
            `${character2.nome} lançou um(a) ${weapon} venceu o confronto!`
          );
          character1.pontos - losePoint;
          console.log(`${character1.nome} perdeu ${losePoint} ponto `);
        } else {
          console.log(`${character1.nome} não tem pontos para perder!`);
        }
        character2.pontos = turbo ? character2.pontos + 1 : character2.pontos;
        character2.pontos = turbo
          ? console.log(`${character2.nome} ganhou um turbo (+ 1 ponto)`)
          : console.log();
      } else if (powerResult2 < powerResult1) {
        if (character2.pontos > 0) {
          console.log(
            `${character1.nome} lançou um(a) ${weapon} venceu o confronto!`
          );
          character2.pontos - losePoint;
          console.log(`${character2.nome} perdeu ${losePoint} ponto `);
        } else {
          console.log(`${character2.nome} não tem pontos para perder!`);
        }
        if (turbo) {
          console.log(`${character2.nome} usou turbo e ganhou 1 ponto extra!`);
          character2.pontos++;
        }
        character1.pontos = turbo ? character1.pontos + 1 : character1.pontos;
        character1.pontos = turbo
          ? console.log(`${character1.nome} ganhou um turbo (+ 1 ponto)`)
          : console.log();
      } else {
        console.log("Empate no confronto! Ninguém perdeu ponto!");
      }
    }

    //winner verification
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.nome} venceu a rodada! e ganhou 1 ponto!`);
      character1.pontos++;
    }
    if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.nome} venceu a rodada! e ganhou 1 ponto!`);
      character2.pontos++;
    }
    if (totalTestSkill1 === totalTestSkill2 && totalTestSkill1 !== 0) {
      console.log("A rodada terminou em empate! Ninguém ganhou ponto!");
    }
    console.log(
      "-------------------------------------------------------------------------------------"
    );
  }
  Winenr(character1, character2);
}

const readline = require("readline");

const personagens = [Mario, Luigi, Peach, Yoshi, Bowser, DK];

function listarPersonagens() {
  console.log("Escolha dois personagens entre os seguintes:");
  personagens.forEach((p) => console.log(`- ${p.nome}`));
}

function encontrarPersonagem(nome) {
  return personagens.find(
    (p) => p.nome.toLowerCase() === nome.trim().toLowerCase()
  );
}

async function obterEntradaUsuario(pergunta) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(pergunta, (resposta) => {
      rl.close();
      resolve(resposta);
    })
  );
}

// (async function main() {
//   listarPersonagens();

//   let personagem1, personagem2;

//   while (!personagem1) {
//     const entrada1 = await obterEntradaUsuario(
//       "Digite o nome do primeiro personagem: "
//     );
//     personagem1 = encontrarPersonagem(entrada1);
//     if (!personagem1) console.log("❌ Personagem inválido. Tente novamente.");
//   }

//   while (!personagem2 || personagem2 === personagem1) {
//     const entrada2 = await obterEntradaUsuario(
//       "Digite o nome do segundo personagem: "
//     );
//     personagem2 = encontrarPersonagem(entrada2);
//     if (!personagem2) {
//       console.log("❌ Personagem inválido. Tente novamente.");
//     } else if (personagem2 === personagem1) {
//       console.log("❌ Os personagens devem ser diferentes!");
//       personagem2 = null;
//     }
//   }

//   console.log(
//     `🏁🚨 Corrida entre ${personagem1.nome} e ${personagem2.nome} começando!`
//   );
//   await playRaceEngine(personagem1, personagem2);
// })();

(async function main() {
  console.log(`🏁🚨 entre ${Mario.nome} e ${Luigi.nome} começando`);
  await playRaceEngine(Mario, Luigi);
})();
