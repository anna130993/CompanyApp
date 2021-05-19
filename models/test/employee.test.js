const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {

    it('should throw an error if any arg is missing', () => {
        const cases = [
            {
                firstName: 'Meredith',
                lastName: 'Grey'
            },
            {
                firstName: 'Meredith',
                department: 'General Surgery'
            },
            {
                lastName: 'Grey',
                department: 'General Surgery'
            }
        ];

        for(let prop of cases) {
            const emp = new Employee(prop);

            emp.validate(err => {
                expect(err.errors).to.exist;
            });
        }
    });

    it('should throw an error if "firstName" is not a string', () => {
        const cases = [{}, []];
        for (let firstName of cases) {
            const emp = new Employee({firstName, lastName: 'Grey', department: 'General Surgery'});

            emp.validate(err => {
                expect(err.errors.firstName).to.exist;
            });
        }
    });

    it('should throw an error if "lastName" is not a string', () => {
        const cases = [{}, []];
        for (let lastName of cases) {
            const emp = new Employee({lastName, firstName: 'Meredith', department: 'General Surgery'});

            emp.validate(err => {
                expect(err.errors.lastName).to.exist;
            });
        }
    });

    it('should throw an error if "department" is not a string', () => {
        const cases = [{}, []];
        for(let department of cases) {
            const emp = new Employee({department, firstName: 'Meredith', lastName: 'Grey'});

            emp.validate(err => {
                expect(err.errors.department).to.exist;
            });
        }
    });

    it('should not throw an error if args are okay', () => {
        const emp = new Employee({firstName: 'Meredith', lastName: 'Grey', department: 'General Surgery'});

        emp.validate(err => {
            expect(err).to.not.exist;
        });
    });
})