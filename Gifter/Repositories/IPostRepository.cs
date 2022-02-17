using Gifter.Models;
using System.Collections.Generic;

namespace Gifter.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<Post> GetAll();
        Post GetById(int id);
        Post GetByIdWithComments(int id);
        void Update(Post post);
        List<Post> GetAllWithComments();
        List<Post> Search(string criterion, bool sortDescending);
        List<Post> Hottest(string date);
    }
}