const fs = require('fs');

let content = fs.readFileSync('dashboard-customer.html', 'utf-8');

const regex = /<td><span class="status-badge status-active">Active<\/span><\/td>\s*<\/tr>\s*<\/tbody>\s*<\/table>\s*<\/div>\s*<\/div>/;
const replacement = `<td><span class="status-badge status-active">Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 4. Report Templates & 5. Export Activity -->
                <div class="dash-chart-row" style="margin-top: 2rem;" data-aos="fade-up">
                    
                    <!-- Report Templates -->
                    <div class="table-card" style="flex: 1;">
                        <div class="chart-header">
                            <h3>Quick Report Templates</h3>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; padding: 0 1.5rem 1.5rem 1.5rem;">
                            
                            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#8b5cf6'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" width="24" height="24" style="margin-bottom: 0.5rem;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                                <h4 style="margin: 0 0 0.25rem 0; color: #f8fafc; font-size: 0.95rem;">Monthly Sales</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 0.75rem;">Revenue &amp; refunds</p>
                            </div>
                            
                            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#38bdf8'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" width="24" height="24" style="margin-bottom: 0.5rem;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                <h4 style="margin: 0 0 0.25rem 0; color: #f8fafc; font-size: 0.95rem;">Audience Overview</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 0.75rem;">User demographics</p>
                            </div>

                            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#10b981'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" width="24" height="24" style="margin-bottom: 0.5rem;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                                <h4 style="margin: 0 0 0.25rem 0; color: #f8fafc; font-size: 0.95rem;">System Health</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 0.75rem;">Uptime &amp; errors</p>
                            </div>

                            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='#f59e0b'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" width="24" height="24" style="margin-bottom: 0.5rem;"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
                                <h4 style="margin: 0 0 0.25rem 0; color: #f8fafc; font-size: 0.95rem;">API Usage</h4>
                                <p style="margin: 0; color: #94a3b8; font-size: 0.75rem;">Endpoints &amp; volume</p>
                            </div>
                            
                        </div>
                    </div>

                    <!-- Recent Export Activity -->
                    <div class="table-card" style="flex: 1;">
                        <div class="chart-header">
                            <h3>Recent Export Activity</h3>
                        </div>
                        <table class="dash-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Report Type</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span style="display: flex; align-items: center; gap: 0.5rem;"><div style="width:24px; height:24px; border-radius:50%; background:#8b5cf6; color:white; font-size:0.7rem; font-weight:bold; display:flex; align-items:center; justify-content:center;">JD</div> John Doe</span></td>
                                    <td>Monthly Analytics</td>
                                    <td>2 hrs ago</td>
                                </tr>
                                <tr>
                                    <td><span style="display: flex; align-items: center; gap: 0.5rem;"><div style="width:24px; height:24px; border-radius:50%; background:#10b981; color:white; font-size:0.7rem; font-weight:bold; display:flex; align-items:center; justify-content:center;">SM</div> Sarah M.</span></td>
                                    <td>Audience Overview</td>
                                    <td>5 hrs ago</td>
                                </tr>
                                <tr>
                                    <td><span style="display: flex; align-items: center; gap: 0.5rem;"><div style="width:24px; height:24px; border-radius:50%; background:#f59e0b; color:white; font-size:0.7rem; font-weight:bold; display:flex; align-items:center; justify-content:center;">AK</div> Ali K.</span></td>
                                    <td>Q2 Financials</td>
                                    <td>1 day ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>`;

if(regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync('dashboard-customer.html', content, 'utf-8');
    console.log('done');
} else {
    console.log('regex did not match');
}
