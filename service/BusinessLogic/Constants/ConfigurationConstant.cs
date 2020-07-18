using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Constants
{
       public static class ConfigurationConstant
    {
        public const string CorsOrginName = "_myAllowSpecificOrigins";
        public struct Logger
        {
            public const string FilePath = "LoggerSettings:LogFilePath";
        }
        public struct Url
        {
            public const string FrontEndUrl = "HelperUrls:FrontendUrl";
            public const string CorsUrl = "HelperUrls:CorsUrl";
            public const string ThumbnailUrl = "FilePaths:Thumbnail";
        }
        public struct ConnectionString
        {
            public const string AadharDb = "AadharDb";
        }
        public struct User
        {
            public const string JwtKey = "AuthSettings:Key";
            public const string JwtAudience = "AuthSettings:Audience";
            public const string JwtIssuer = "AuthSettings:Issuer";
            public const bool RequireDigit = true;
            public const int RequiredLength = 5;
        }
        public struct Mail
        {
            public const string FromEmail = "MailSettings:FromEmail";
            public const string Name = "MailSettings:FromEmail";
            public const string Password = "MailSettings:FromPassword";
            public const string SmtpHost = "MailSettings:SmtpHost";
            public const int SmtpPort = 587;
            public const int SmtpTimeOut = 20000;
        }
    }
}
