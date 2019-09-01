import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      // se tiver na pagina 1, entao mostrará os primeiros 20 registros, se tiver na 2 pulará 20 e assim por diante
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    /**
     * verifica se o Provider_ID e Date estão preenchidos
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    /**
     * se ele retornar nada acima, é que nao é provider
     */
    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    /**
     * pega somente a hora e desconsidera minuotos e segundos. O parseIso serve para transformar a data que
     * digitei no back em formata que o JS reconhece
     */
    const hourStart = startOfHour(parseISO(date));

    /**
     * verifica se a data digitada pelo usuário é menor que data atual
     * */
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * Verifica disponibilidade
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      // req.user_id vem do middleware de autenticação que seta quando o usuario se loga
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
