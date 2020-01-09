using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SimpleSignalRService.Hubs
{
    public class MessageHub : Hub
    {
        public async Task SendMessage(string channel, int time)
        {
            await Clients.All.SendAsync("ReceiveMessage", channel, time);
        }
    }
}