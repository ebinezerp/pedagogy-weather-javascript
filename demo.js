let user = {
    name:'ebinezer',
    age:27,
    job:{
        title:'tech-mentor',
        salary: 30000
    },
    lang:['hindi','english','telugu']
}

let nums = [56,5,6,7,8];

for(att in user){
    console.log(att);
    console.log(Array.isArray(att));
    console.log(typeof (att));
}

for(let num of nums){
    console.log(num);
}

