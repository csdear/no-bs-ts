
// Map To Id (typescript)
// Reformats an array of objects
// Bumps ID up then uses Omit utility class to omit id from the object within (so we dont have redundant IDs )
// Sasuage making, transformer,

/**
FROM format :
        [
                    {
                        id: 1,
                        name: "Mr. Foo",
                    },
                    {
                        id: 2,
                        name: "Mrs. Baz",
                        email: "baz@gmail.com"
                    },
        ]

TO format :

        {
        '1': { name: 'Mr. Foo' },
        '2': { name: 'Mrs. Baz', email: 'baz@gmail.com' }
        }

        */


interface MyUser {
    name: string;
    id: number;
    email?: string;
    // phone?: string;
}

const employees: MyUser[] = [
            {
                id: 1,
                name: "Mr. Foo",
            },
            {
                id: 2,
                name: "Mrs. Baz",
                email: "baz@gmail.com"
            },
]

// const mapById = (users: MyUser[]): Record<string, MyUser> => {
//     return users.reduce((a, v) => {
//         return {
//             ...a,
//             [v.id]: v,
//         };
//     }, {});
// };

type UserWithoutID2 = Omit<MyUser, "id">;

const mapById2 = (users: MyUser[]): Record<MyUser["id"], UserWithoutID2> => {
    return users.reduce((a, v) => {
        const { id, ...other } = v;
        return {
            ...a,
            [id]: other,
        };
    }, {});
};

// console.log(
//     mapById(employees)
// );

console.log(
    mapById2(employees)
);

/**
FROM

[
            {
                id: 1,
                name: "Mr. Foo",
            },
            {
                id: 2,
                name: "Mrs. Baz",
                email: "baz@gmail.com"
            },
]

TO

{
  '1': { name: 'Mr. Foo' },
  '2': { name: 'Mrs. Baz', email: 'baz@gmail.com' }
}
*/