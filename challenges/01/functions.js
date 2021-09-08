const fs = require("fs");
const path = require("path");

function lerDiretorio(caminho) {
  return new Promise((resolve, reject) => {
    try {
      const arquivos = fs.readdirSync(caminho);
      const arquivosCompletos = arquivos.map((arquivo) =>
        path.join(caminho, arquivo)
      );
      resolve(arquivosCompletos);
    } catch (e) {
      reject(e);
    }
  });
}

function elementosTerminadosCom(padraoTextual) {
  return function (array) {
    return array.filter((arquivo) => arquivo.endsWith(padraoTextual));
  };
}

function lerArquivo(caminho) {
  return new Promise((resolve, reject) => {
    try {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      resolve(conteudo.toString());
    } catch (error) {
      reject(e);
    }
  });
}

function lerArquivos(caminhos) {
  return Promise.all(caminhos.map((caminho) => lerArquivo(caminho)));
}

function removerElementosSeVazio(array) {
  return array.filter((el) => el.trim());
}

function removerElementosSeIncluir(padraoTextual) {
  return function (array) {
    return array.filter((el) => !el.includes(padraoTextual));
  };
}

function removerElementosSeApenasNumeros(array) {
  return array.filter((el) => {
    const num = parseInt(el.trim());
    return num !== num;
  });
}

function removerSimbolos(simbolos) {
  return function (array) {
    return array.map((el) => {
      return simbolos.reduce((acc, simbolo) => {
        return acc.split(simbolo).join("");
      }, el);
    });
  };
}

const mesclarElementos = (conteudos) => conteudos.join(" ");

const separarPor = (padraoTextual) => {
  return function (todoConteudo) {
    return todoConteudo.split(padraoTextual);
  };
};

function agruparElementos(palavras) {
  return Object.values(
    palavras.reduce((acc, palavra) => {
      const el = palavra.toLowerCase();
      const qtde = acc[el] ? acc[el].qtde + 1 : 1;
      acc[el] = {
        elemento: el,
        qtde,
      };

      return acc;
    }, {})
  );
}

function ordenarPorAtribNumerico(attr, ordem = "asc") {
  return function (array) {
    const asc = (o1, o2) => o1[attr] - o2[attr];
    const desc = (o1, o2) => o2[attr] - o1[attr];
    return array.sort(ordem === "asc" ? asc : desc);
  };
}

function composicao(...fns) {
  return function(valor) {
    return fns.reduce(async (acc, fn) => {
      if (Promise.resolve(acc) === acc) {
        return fn( await acc);
      } else {
        return fn(acc)
      }
    }, valor)
  }
}

module.exports = {
  lerDiretorio,
  lerArquivo,
  lerArquivos,
  elementosTerminadosCom,
  removerElementosSeVazio,
  removerElementosSeIncluir,
  removerElementosSeApenasNumeros,
  removerSimbolos,
  mesclarElementos,
  separarPor,
  agruparElementos,
  ordenarPorAtribNumerico,
  composicao
};
