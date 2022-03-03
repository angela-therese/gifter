using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Gifter.Models
{
    public class Post
    {
        public int Id { get; set; }

  
        public string Title { get; set; }

      
        public string ImageUrl { get; set; }

        public string Caption { get; set; }

        
        public int UserProfileId { get; set; }

      
        public DateTime DateCreated { get; set; }

        
        public UserProfile UserProfile { get; set; }

        public List<Comment> Comments { get; set; }

        public int Likes;

    }
}