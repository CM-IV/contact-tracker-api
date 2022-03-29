import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ContactService from "../services/ContactService";

export default class ContactsController {
    public show(uuid: HttpContextContract){
        return ContactService.getContactById(uuid);
    }

    public index(req: HttpContextContract){
        return ContactService.getAllContacts(req);
    }

    public store(contactObj: HttpContextContract){
        return ContactService.addContact(contactObj);
    }

    public update(contactObj: HttpContextContract){
        return ContactService.updateContact(contactObj);
    }

    public destroy(uuid: HttpContextContract){
        return ContactService.deleteContact(uuid);
    }

}
