using DataTransferObject.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interface
{
    public interface IUdhyamAadharService
    {
        Task<ResponseDto> Add(UdhyamAadharDto model, string confirmationLink);
    }
}
