const editnumber=function(phoneNumber) {
    // Remove spaces or special characters if present
    phoneNumber = phoneNumber.replace(/\D/g, '');
    // Check if the number starts with a '0' and remove it
    if (phoneNumber.startsWith('0')) {
      phoneNumber = phoneNumber.slice(1);
    }
    // Add the country code '+213'
    return '+213' + phoneNumber;
}
module.exports=editnumber;