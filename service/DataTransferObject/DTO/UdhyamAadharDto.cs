using System.ComponentModel.DataAnnotations;

namespace DataTransferObject.DTO
{
    public class UdhyamAadharDto
    {
        public UdhyamAadharDto()
        {
            ApplicantDetails = new ApplicantDetailsDto();
            OrganisationDetails = new OrganisationDetailsDto();
            BankDetails = new BankDetailsDto();
        }
        public ApplicantDetailsDto ApplicantDetails { get; set; }
        public OrganisationDetailsDto OrganisationDetails { get; set; }
        public BankDetailsDto BankDetails { get; set; }
    }

    public class ApplicantDetailsDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AadhaarNumber { get; set; }
        public string MobileNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public int Category { get; set; }
    }

    public class OrganisationDetailsDto
    {
        public string OrganisationName { get; set; }
        public string RegisteredAddress { get; set; }
        public string PanNumber { get; set; }
        public string DateOfEstablishment { get; set; }
        public int OrganisationType { get; set; }
        public int PersonEmployed { get; set; }
        public string TotalInvestment { get; set; }
        public string Desciption { get; set; }
    }

    public class BankDetailsDto
    {
        public string BankAccountNumber { get; set; }
        public string BankIfscCode { get; set; }
    }
}