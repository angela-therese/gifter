using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Gifter.Models;
using Gifter.Utils;

namespace Gifter.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, Name, Email, ImageUrl, DateCreated, Bio FROM UserProfile";

                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();

                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")


                        });
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name, Email, ImageUrl, DateCreated, Bio FROM UserProfile
                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    UserProfile userProfile = null;
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated")


                        };
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetByIdWithPosts(int id)
        {
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"SELECT 
                        p.Id AS PostId, p.Title AS PostTitle, p.ImageUrl AS PostImage, p.DateCreated AS PostDateCreated,
                        up.Id AS UserId, up.Name AS UserName, up.Email, up.ImageUrl AS UserImage, up.DateCreated AS ProfileDateCreated, up.Bio

                           

                          FROM UserProfile up
                            FULL JOIN Post p  on up.Id = p.UserProfileId
                            WHERE up.Id  = @Id";


                        DbUtils.AddParameter(cmd, "@Id", id);

                        var reader = cmd.ExecuteReader();

                        UserProfile userProfile = null;
                        while (reader.Read())
                        {
                            if(userProfile == null)
                            {
                                userProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ImageUrl = DbUtils.GetString(reader, "UserImage"),
                                    Bio = DbUtils.GetString(reader, "Bio"),
                                    DateCreated = DbUtils.GetDateTime(reader, "ProfileDateCreated"),
                                    Posts = new List<Post>()
                                };

                            }
                           
                            if (DbUtils.IsNotDbNull(reader, "PostId"))
                            {
                                userProfile.Posts.Add(new Post()
                                {
                                    Id = DbUtils.GetInt(reader, "PostId"),
                                    Title = DbUtils.GetString(reader, "PostTitle"),
                                    ImageUrl = DbUtils.GetString(reader, "PostImage"),
                                    UserProfileId = DbUtils.GetInt(reader, "UserId")

                                });
                            }
                        }

                        

                        reader.Close();

                        return userProfile;
                    }
                }
            }
        }



            public void Add(UserProfile userProfile)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        INSERT INTO UserProfile (Name, Email, ImageUrl, Bio, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Email, @ImageUrl, @Bio, @DateCreated)";

                        DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                        DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Bio", userProfile.Bio);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);

                        userProfile.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name, Email, ImageUrl, Bio, DateCreated FROM UserProfile WHERE Email = @email";
                    cmd.Parameters.AddWithValue("@email", email);



                    var reader = cmd.ExecuteReader();

                    UserProfile user = null;
                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                           DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public void Update(UserProfile userProfile)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        UPDATE UserProfile
                           SET [Name] = @Name,
                               Email = @Email,
                               ImageUrl = @ImageUrl,
                               Bio = @Bio,
                               DateCreated = @DateCreated
                               
                         WHERE Id = @Id";

                        DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                        DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                        DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
                        DbUtils.AddParameter(cmd, "@Bio", userProfile.Bio);
                        DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);
                        DbUtils.AddParameter(cmd, "@Id", userProfile.Id);

                        cmd.ExecuteNonQuery();
                    }
                }
            }

            public void Delete(int id)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                        DbUtils.AddParameter(cmd, "@id", id);
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }