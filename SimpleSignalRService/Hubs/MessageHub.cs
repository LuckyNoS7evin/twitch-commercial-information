using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SimpleSignalRService.Hubs
{
    public class MessageHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            }
            await base.OnConnectedAsync();
        }


        [Authorize]
        public async Task SendMessage(int time)
        {
            var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            await Clients.Group(userId).SendAsync("ReceiveMessage", time);
        }

        public async Task Listen(string channelId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, channelId);
        }
    }
}