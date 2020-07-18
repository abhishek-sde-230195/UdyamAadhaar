using BusinessLogic.Interface;
using Data.DBContext;
using DataTransferObject.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using BusinessLogic.Constants;

namespace BusinessLogic.Service
{
    public class UdhyamAadharService : BaseService, IUdhyamAadharService
    {
        private readonly IUserService _userService;
        private ProjectContext _context;
        private IConfiguration _configuration;

        public UdhyamAadharService(IUserService userService, ProjectContext context, IConfiguration configuration)
        {
            _userService = userService;
            _context = context;
            _configuration = configuration;
        }
        #region Private Region
        private bool IsValidDto(UdhyamAadharDto model)
        {
            bool isValid = true;

            return isValid;
        }
        #endregion
        public Task<ResponseDto> Add(UdhyamAadharDto model, string confirmationLink)
        {
            if (IsValidDto(model))
            {
                RegisterDto registerObj = new RegisterDto
                {
                    FirstName = model.ApplicantDetails.FirstName,
                    LastName = model.ApplicantDetails.LastName,
                    Email = model.ApplicantDetails.Email,
                    Password = _configuration[ConfigurationConstant.User.DefaultPassword]
                };


            }
            throw new Exception();
        }
    }
}
