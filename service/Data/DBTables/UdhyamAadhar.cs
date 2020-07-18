using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data.DBTables
{
    public class UdhyamAadhar
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AadhaarNumber { get; set; }
        public string MobileNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public int Category { get; set; }
        public string OrganisationName { get; set; }
        public string RegisteredAddress { get; set; }
        public string PanNumber { get; set; }
        public string DateOfEstablishment { get; set; }
        public int OrganisationType { get; set; }
        public int PersonEmployed { get; set; }
        public string TotalInvestment { get; set; }
        public string Desciption { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankIfscCode { get; set; }
    }
}
