const User = require('../models/user');
const Contact = require('../models/contact');

exports.createContact = async (req,res) => {
    try{
        const userData = req.user;

        const contactData = req.body;
        
        const userId = userData.id;
        contactData.user = userId;

        const user = await User.findById(userId);

        if(!user) return res.status(401).josn({message: "user is not registered"});
        
        if (!contactData.phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const newContact = new Contact(contactData);

        const savedContact = await newContact.save();

        res.status(200).json({
            contact: savedContact,
            message: 'Contact created successfully'
        });
    }
    catch(err){
        res.status(500).json({
            error : err,
            message:"some error occured during contact creation"
        });
    }
}

exports.updateContact = async(req,res) => {
    try{
        const userId = req.user.id;
        const updatedContactData = req.body;
        const user = await User.findById(userId);
        
        if(!user){
            return res.status(404).json({message: 'user not found'});
        }
        const getcontact = await Contact.findOne({user: userId});
        const contactId = getcontact.id;

        if(!getcontact) {
            return res.status(404).json({message: 'Contact details are  empty can\'t be updated'});
        }

        const response = await Contact.findByIdAndUpdate(contactId, updatedContactData);

        res.status(200).json({message: "Contact updated successfully"});
    }catch(err){
        res.status(500).json({message: "Internal server error", error: err})
    }
}

exports.searchContact = async (req,res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const searchText = req.body;
        
        if(! await User.findById(userId)) return res.status(401).josn({message: "user is not registered"});

        if(!searchText) return res.status(404).json({message: 'Search query can\'t be empty'});
        
        const regex = new RegExp(searchText, 'i');
       
        const getContacts = await Contact.find({ name: { $regex: regex } });
        
        if(!getContacts.length) {
            return res.status(404).json({ message: 'No contacts found' });
        }
                
        res.status(200).json(getContacts);
    }
    catch(err){
        res.status(500).json({message: "Internal server error", error: err})
    }
}