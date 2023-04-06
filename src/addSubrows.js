
const addSubrows = (json) => {

    const delimiter = ";";

    json.forEach((element) => {
        let addressArr = element.address!=null ? element.address.split(delimiter) : [];
        let phoneArr = element.phone!=null ? element.phone.split(delimiter) : [];
        const count = addressArr.length > phoneArr.length ? addressArr.length : phoneArr.length;
        addressArr.shift();
        phoneArr.shift();
        element.subRows=[];
        for (let i=1;i<count;i++) {
            element.subRows.push({
                address: addressArr.shift(),
                phone: phoneArr.shift()
            })
        }
    });
}

export default addSubrows;