const axios = require("axios");
const Mecanica = require("../models/Mecanica");

module.exports = {
  async store(request, response) {
    const mecanincas = request.body;
    mecanincas.map(async (mecanica) => {
      let name = mecanica["name"];
      let telefone = mecanica["telefone"];
      let endereco = mecanica["endereco"];
      let email = mecanica["email"];
      let site = mecanica["site"];
      let servicos = mecanica["servicos"];
      let location = mecanica["location"];
      let avaliacao = mecanica["avaliacao"];
      let preco = mecanica["preco"];

      await Mecanica.create({
        name,
        telefone,
        endereco,
        email,
        site,
        servicos,
        location,
        avaliacao,
        preco,
      });
    });

    return response.json();
  },

  async updateReview(request, response) {
    const { mecanicaId } = request.body;

    let mecanica = await Mecanica.findById(mecanicaId);
    const apiResponse = await axios.get(
      "http://localhost:3030/api/mediaAvaliacoes",
      { params: { mecanicaId: mecanicaId } }
    );
    mecanica.avaliacao = apiResponse.data.mediaAvaliacoes;
    mecanica.preco = apiResponse.data.mediaPrecos;

    await Mecanica.update(mecanica);

    return response.status(204).json(mecanica);
  },
};
