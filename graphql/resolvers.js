const Employee = require("../models/EmployeeModel")

module.exports = {
  Query: {
    async employee(_, { id }) {
      return await Employee.findById(id)
    },
    // async getEmployees() {
    //   return await Employee.find()
    // },
  },
  Mutation: {
    async createEmployee(
      _,
      { EmployeeInput: { first_name, last_name, email, gender, salary } }
    ) {
      if (!first_name || !last_name || !email || !gender || !salary) {
        throw new Error("One or more fields are empty")
      }

      const createdEmployee = new Employee({
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        salary: salary,
      })

      const res = await createdEmployee.save() // MongoDB saving
      console.log(res)

      return {
        ...res._doc,
      }
    },
  },
}
