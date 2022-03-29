import Contact from '../models/Contact';
import { schema, rules } from "@ioc:Adonis/Core/Validator";

//Singleton
class ContactService {
    public async getContactById({ params }) {
        const contact = Contact.findOrFail(params.id);

        return contact;
    }

    public async getAllContacts({ request }) {
        const page = request.input("page", 1);

        const limit = request.input("per_page", 5);
        
        const contacts = Contact.query().paginate(page, limit);

        return contacts;
    }

    public async addContact({ request, response }) {
        const contactSchema = schema.create({
            firstName: schema.string(),
            lastName: schema.string(),
            phoneNumber: schema.string({}, [
                rules.mobile()
            ]),
            workPlace: schema.string(),
            notes: schema.string()
        })

        const payload = await request.validate({ schema: contactSchema });

        await Contact.create({
            firstName: payload.firstName,
            lastName: payload.lastName,
            phoneNumber: payload.phoneNumber,
            workPlace: payload.workPlace,
            notes: payload.notes
        });

        return response.created();
    }

    public async updateContact({ params ,response, request }) {
        const contact = await Contact.findOrFail(params.id);

        const contactSchema = schema.create({
            firstName: schema.string(),
            lastName: schema.string(),
            phoneNumber: schema.string({}, [
                rules.mobile()
            ]),
            workPlace: schema.string(),
            notes: schema.string()
        })

        const payload = await request.validate({ schema: contactSchema });

        contact.firstName = payload.firstName,
        contact.lastName = payload.lastName,
        contact.phoneNumber = payload.phoneNumber,
        contact.workPlace = payload.workPlace,
        contact.notes = payload.notes

        contact.save();

        return response.json({ contact });
    }

    public async deleteContact({ params ,response }) {
        const contact = await Contact.findOrFail(params.id);

        if (!contact) {
            return `Contact with ID of ${params.id} does not exist!`
        }

        contact.delete();

        response.status(200);

        return `Contact with ID of ${params.id} was deleted!`
    }
}

//return new instance
//non-static methods in ContactService
export default new ContactService();