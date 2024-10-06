
export const filterResidentData = (data: any) => {
    var clientDisplayData = {
        username: data.username?data.username:"",
        name: data.name?data.name:"",
        apartmentNo: data['apartment no']?data['apartment no']:"", 
        email: data.email?data.email:"",
        personalIdentification: data["personal identification"]?data["personal identification"]:"",
        yearOfEnrollment: data['year of enrollment']?data['year of enrollment']:""
    }
    return clientDisplayData;
}